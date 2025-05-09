// import { render, screen } from '@testing-library/react'
// import { Provider } from 'react-redux'
// import configureStore from 'redux-mock-store'
// import { Store } from 'redux'
// import { TActiveAgent } from '@/api-rest/agents/types'
// import { ActiveAgentsTable } from './ActiveAgentsTable'
// import '@testing-library/jest-dom'
//
// // Mock all required dependencies
// jest.mock('@/icons/SortIcon', () => ({
//   SortIcon: () => null,
// }))
//
// jest.mock('@peiko/components/Text', () => ({
//   Text: ({ children }: { children: React.ReactNode }) => children,
// }))
//
// jest.mock('@/components/Flex', () => ({
//   Flex: ({ children }: { children: React.ReactNode }) => children,
// }))
//
// jest.mock('@peiko/components/links/NextLink', () => ({
//   NextLink: ({ children }: { children: React.ReactNode }) => children,
// }))
//
// jest.mock('@peiko/components/loaders/Loader', () => ({
//   Loader: () => null,
// }))
//
// jest.mock('react-merge-refs', () => ({
//   mergeRefs: jest.fn((refs) => refs[0]),
// }))
//
// const formatDurationMock = jest.fn()
// jest.mock('@/utils/date-to-string', () => ({
//   formatDuration: formatDurationMock,
// }))
//
// const mockStore = configureStore([])
//
// describe('ActiveAgentsTable', () => {
//   const mockAgent: TActiveAgent = {
//     id: 1,
//     name: 'Test Agent',
//     workStatus: 'online',
//     callsHandled: '10',
//     timeOnline: 0,
//     ongoingTime: '0',
//   }
//
//   const renderWithStore = (store: Store) => render(
//     <Provider store={store}>
//       <ActiveAgentsTable />
//     </Provider>,
//   )
//
//   beforeEach(() => {
//     jest.clearAllMocks()
//   })
//
//   it('should show "0s" when both timeOnline and ongoingTime are 0', () => {
//     const store = mockStore({
//       agents: {
//         activeAgents: [mockAgent],
//         isLoading: false,
//       },
//     })
//     renderWithStore(store)
//     const timeCell = screen.getByText('0s')
//     expect(timeCell).toBeInTheDocument()
//     expect(formatDurationMock).toHaveBeenCalledWith(0)
//   })
//
//   it('should show correct time when timeOnline is 0 and ongoingTime has value', () => {
//     const agent: TActiveAgent = { ...mockAgent, timeOnline: 0, ongoingTime: '65' }
//     const store = mockStore({
//       agents: {
//         activeAgents: [agent],
//         isLoading: false,
//       },
//     })
//     renderWithStore(store)
//     const timeCell = screen.getByText('1m 5s')
//     expect(timeCell).toBeInTheDocument()
//     expect(formatDurationMock).toHaveBeenCalledWith(65)
//   })
//
//   it('should show correct time when timeOnline has value and ongoingTime is 0', () => {
//     const agent: TActiveAgent = { ...mockAgent, timeOnline: 300, ongoingTime: '0' }
//     const store = mockStore({
//       agents: {
//         activeAgents: [agent],
//         isLoading: false,
//       },
//     })
//     renderWithStore(store)
//     const timeCell = screen.getByText('5m 0s')
//     expect(timeCell).toBeInTheDocument()
//     expect(formatDurationMock).toHaveBeenCalledWith(300)
//   })
//
//   it('should show correct time when both timeOnline and ongoingTime have values', () => {
//     const agent: TActiveAgent = { ...mockAgent, timeOnline: 300, ongoingTime: '65' }
//     const store = mockStore({
//       agents: {
//         activeAgents: [agent],
//         isLoading: false,
//       },
//     })
//     renderWithStore(store)
//     const timeCell = screen.getByText('6m 5s')
//     expect(timeCell).toBeInTheDocument()
//     expect(formatDurationMock).toHaveBeenCalledWith(365)
//   })
//
//   it('should handle string values for timeOnline', () => {
//     const agent: TActiveAgent = {
//       ...mockAgent,
//       timeOnline: '300' as unknown as number,
//       ongoingTime: '0',
//     }
//     const store = mockStore({
//       agents: {
//         activeAgents: [agent],
//         isLoading: false,
//       },
//     })
//     renderWithStore(store)
//     const timeCell = screen.getByText('5m 0s')
//     expect(timeCell).toBeInTheDocument()
//     expect(formatDurationMock).toHaveBeenCalledWith(300)
//   })
//
//   it('should handle string values for ongoingTime', () => {
//     const agent: TActiveAgent = { ...mockAgent, timeOnline: 0, ongoingTime: '65' }
//     const store = mockStore({
//       agents: {
//         activeAgents: [agent],
//         isLoading: false,
//       },
//     })
//     renderWithStore(store)
//     const timeCell = screen.getByText('1m 5s')
//     expect(timeCell).toBeInTheDocument()
//     expect(formatDurationMock).toHaveBeenCalledWith(65)
//   })
// })
