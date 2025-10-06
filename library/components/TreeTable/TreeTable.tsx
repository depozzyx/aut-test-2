import React, { Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { HorizontalScroll } from '@peiko/components/HorizontalScroll'
import { InlineLoader } from '@peiko/components/loaders/InlineLoader'
import { THeader } from '../Table/types'
import * as S from '../Table/Table.styled'
import { Box } from '../Box'
import { TTreeRow, TTreeTableProps } from './types'

type TVisibleRow<R> = {
  depth: number
  row: R & { id: string | number }
  hasChildren: boolean
}

function buildVisibleRows<R extends Record<string, React.ReactNode>>(
  nodes: Array<TTreeRow<R>>,
  open: Array<string | number>,
  depth = 0,
  acc: Array<TVisibleRow<R>> = [],
): Array<TVisibleRow<R>> {
  nodes.forEach((node) => {
    const { children, ...rest } = node
    const hasChildren = !!children && children.length > 0
    const { id } = rest as R & { id: string | number }
    acc.push({ depth, row: rest as R & { id: string | number }, hasChildren })
    if (hasChildren && open.includes(id)) {
      buildVisibleRows(children as Array<TTreeRow<R>>, open, depth + 1, acc)
    }
  })
  return acc
}

export function TreeTable<K extends PropertyKey>({
  headerData,
  rows,
  bodyCell,
  headerCell,
  buttonCollapse,
  loading,
  emptyComponent,
  minHeight,
  styles,
  indent = 16,
  maxHeight,
  rowStyleByDepth,
  footerRow,
  footerCell,
  footerStyles,
  opened = [],
  onOpenClose,
}: TTreeTableProps<Record<K, React.ReactNode>, THeader<K>>): JSX.Element {
  function expandAll(
    nodes: Array<TTreeRow<unknown>>,
    acc: Array<string | number> = [],
  ): Array<string | number> {
    nodes.forEach((node) => {
      const { children, ...rest } = node
      const hasChildren = !!children && children.length > 0
      const { id } = rest
      if (hasChildren) {
        acc.push(id)
        expandAll(children as Array<TTreeRow<unknown>>, acc)
      }
    })

    return acc
  }

  const [open, setOpen] = useState<Array<string | number>>(opened)
  const boxRef = useRef<HTMLDivElement | null>(null)
  const [computedMaxHeight, setComputedMaxHeight] = useState<string | undefined>(
    undefined,
  )
  const resolvedMaxHeight = useMemo(
    () => maxHeight ?? computedMaxHeight,
    [maxHeight, computedMaxHeight],
  )

  useLayoutEffect(() => {
    const GAP_PX = 20
    const compute = () => {
      if (!boxRef.current) return
      const rect = boxRef.current.getBoundingClientRect()
      const top = Math.max(0, Math.ceil(rect.top))
      setComputedMaxHeight(`calc(100vh - ${top}px - ${GAP_PX}px)`)
    }
    compute()
    // recompute on resize and scroll
    const onChange = () => compute()
    window.addEventListener('resize', onChange)
    window.addEventListener('scroll', onChange, { passive: true })
    return () => {
      window.removeEventListener('resize', onChange)
      window.removeEventListener('scroll', onChange)
    }
  }, [])

  type RRow = Record<K, React.ReactNode>

  const visibleRows = useMemo(
    () => buildVisibleRows<RRow>(rows as Array<TTreeRow<RRow>>, open),
    [rows, open, opened],
  )
  const hasRows = visibleRows.length > 0

  const toggle = (id: string | number) => {
    const newOpen = open.includes(id) ? open.filter((x) => x !== id) : [...open, id]
    setOpen(newOpen)
    if (onOpenClose) {
      onOpenClose(newOpen)
    }
  }

  const gridTemplateColumns = useMemo(() => {
    const cols = headerData.map(({ width }) =>
      width ? `minmax(${width}, auto)` : 'auto',
    )
    return buttonCollapse ? ['min-content', ...cols].join(' ') : cols.join(' ')
  }, [headerData, buttonCollapse])

  return (
    <HorizontalScroll>
      <div style={{ width: '100%' }}>
        <InlineLoader variant="table" loading={loading} borderRadius={4} />
        <div ref={boxRef} style={{ width: '100%' }}>
          <Box
            styles={{
              width: '100%',
              ...(minHeight ? { minHeight } : {}),
              ...(resolvedMaxHeight ? { maxHeight: resolvedMaxHeight } : {}),
              overflowY: 'auto', // enable vertical scroll here
              overscrollBehavior: 'contain', // prevent scroll chaining to page
              position: 'relative', // good practice for stacking context
              ...styles,
            }}
          >
            <S.Table gridTemplateColumns={gridTemplateColumns}>
              {/* header cells (add background) */}
              {buttonCollapse &&
                headerCell({
                  isFirstCell: true,
                  style: {
                    gridColumn: '1 / 2',
                    gridRow: '1 / 2',
                    paddingLeft: 2,
                    paddingRight: 2,
                    alignSelf: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    position: 'sticky',
                    top: 0,
                    zIndex: 3,
                    boxShadow: '0 1px 0 rgba(0,0,0,0.08)',
                  },
                  children: buttonCollapse
                    ? buttonCollapse({
                        isOpen: open.length > 0,
                        onClick: () =>
                          open.length > 0 ? setOpen([]) : setOpen(expandAll(rows)),
                      })
                    : undefined,
                })}

              {headerData.map((h, i) => (
                <Fragment key={String(h.value)}>
                  {headerCell({
                    style: {
                      gridColumn: `${buttonCollapse ? i + 2 : i + 1} / ${
                        buttonCollapse ? i + 3 : i + 2
                      }`,
                      gridRow: '1 / 2',
                      position: 'sticky',
                      top: 0,
                      zIndex: 3,
                      boxShadow: '0 1px 0 rgba(0,0,0,0.08)',
                    },
                    isFirstCell: !buttonCollapse && i === 0,
                    isEndCell: i === headerData.length - 1,
                    children: h.label,
                  })}
                </Fragment>
              ))}

              {/* rows */}
              {hasRows && (
                <>
                  {visibleRows.map((item, index) => {
                    const rowIndex = index + 2
                    const { row, depth, hasChildren } = item
                    const r = row as unknown as { id: string | number } & RRow
                    const isOpen = open.includes(r.id)

                    const depthStyle =
                      typeof rowStyleByDepth === 'function'
                        ? rowStyleByDepth(depth)
                        : rowStyleByDepth?.[depth]

                    return (
                      <Fragment key={String(r.id)}>
                        {buttonCollapse &&
                          bodyCell({
                            isFirstCell: true,
                            isLastRow: index === visibleRows.length - 1,
                            style: {
                              gridColumn: '1 / 2',
                              gridRow: `${rowIndex} / ${rowIndex + 1}`,
                              paddingLeft: 4,
                              paddingRight: 4,
                              alignSelf: 'center',
                              textAlign: 'center',
                              justifyContent: 'center',
                              display: 'flex',
                              ...(depthStyle || {}),
                            },
                            children:
                              hasChildren && buttonCollapse
                                ? buttonCollapse({ isOpen, onClick: () => toggle(r.id) })
                                : undefined,
                          })}

                        {headerData.map((h, colIndex) => {
                          const isFirstCell = colIndex === 0
                          const isEndCell = colIndex === headerData.length - 1
                          let paddingLeft = indent
                          if (buttonCollapse ? colIndex === 0 : isFirstCell) {
                            paddingLeft = (depth + 1) * indent
                          }
                          const content = r[h.value]
                          return (
                            <Fragment key={`${String(r.id)}-${String(h.value)}`}>
                              {bodyCell({
                                isFirstCell: !buttonCollapse && isFirstCell,
                                isEndCell,
                                isLastRow: index === visibleRows.length - 1,
                                style: {
                                  gridColumn: `${
                                    buttonCollapse ? colIndex + 2 : colIndex + 1
                                  } / ${buttonCollapse ? colIndex + 3 : colIndex + 2}`,
                                  gridRow: `${rowIndex} / ${rowIndex + 1}`,
                                  paddingLeft,
                                  ...(depthStyle || {}),
                                },
                                children: content,
                              })}
                            </Fragment>
                          )
                        })}
                      </Fragment>
                    )
                  })}

                  {/* footer row */}
                  {footerRow && (
                    <>
                      {buttonCollapse &&
                        (footerCell || bodyCell)({
                          isFirstCell: true,
                          isLastRow: true,
                          style: {
                            gridColumn: '1 / 2',
                            gridRow: `${visibleRows.length + 2} / ${
                              visibleRows.length + 3
                            }`,
                            ...(footerStyles || {}),
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'sticky',
                            bottom: 0,
                            zIndex: 3,
                            boxShadow: '0 -1px 0 rgba(0,0,0,0.08)',
                          },
                          children: undefined,
                        })}
                      {headerData.map((h, colIndex) => {
                        const isFirstCell = colIndex === 0
                        const isEndCell = colIndex === headerData.length - 1
                        const cellContent = footerRow[h.value as keyof typeof footerRow]
                        const Cell = footerCell || bodyCell
                        return (
                          <Fragment key={`footer-${String(h.value)}`}>
                            {Cell({
                              isFirstCell: !buttonCollapse && isFirstCell,
                              isEndCell,
                              isLastRow: colIndex === visibleRows.length - 1,
                              style: {
                                gridColumn: `${
                                  buttonCollapse ? colIndex + 2 : colIndex + 1
                                } / ${buttonCollapse ? colIndex + 3 : colIndex + 2}`,
                                gridRow: `${visibleRows.length + 2} / ${
                                  visibleRows.length + 3
                                }`,
                                ...(footerStyles || {}),
                                position: 'sticky',
                                bottom: 0,
                                zIndex: 3,
                                boxShadow: '0 -1px 0 rgba(0,0,0,0.08)',
                              },
                              children: cellContent,
                            })}
                          </Fragment>
                        )
                      })}
                    </>
                  )}
                </>
              )}
            </S.Table>
            {!hasRows && emptyComponent}
          </Box>
        </div>
      </div>
    </HorizontalScroll>
  )
}
