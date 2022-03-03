export const endpointMocks = [
  {
    path: '/api/messages-service/client-api/v4/message-center/messages/unread-conversation-count?page=1&size=25',
    activeStatusCode: 500,
    emptyArray: false,
    method: 'GET',
    forward: false,
    delay: 0,
  },
  {
    path: '/api/user-manager/client-api/v2/users/me',
    activeStatusCode: 500,
    emptyArray: true,
    method: 'GET',
    forward: false,
    delay: 0,
  },
  {
    path: '/api/messages-service/client-api/v4/message-center/messages/unread-conversation-count?size=25',
    activeStatusCode: 500,
    emptyArray: false,
    method: 'GET',
    forward: false,
    delay: 0,
  },
  {
    path: '/api/messages-service/client-api/v4/message-center/messages/unread-conversation-count',
    activeStatusCode: 500,
    emptyArray: false,
    method: 'GET',
    forward: false,
    delay: 500,
  },
  {
    path: '/api/arrangement-manager/client-api/v2/productsummary',
    activeStatusCode: 500,
    emptyArray: true,
    method: 'GET',
    forward: false,
    delay: 0,
  },
  {
    path: '/api/payment-order-service/client-api/v2/payment-orders/customer-profile/details',
    activeStatusCode: 500,
    emptyArray: false,
    method: 'GET',
    forward: false,
    delay: 300,
  },
  {
    path: '/api/notifications-service/client-api/v2/notifications/unread-count',
    activeStatusCode: 500,
    emptyArray: false,
    method: 'GET',
    forward: false,
    delay: 0,
  },
];
