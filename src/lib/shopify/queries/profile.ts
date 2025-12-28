

export const CUSTOMER_UPDATE = `
  mutation customerUpdate(
    $customerAccessToken: String!
    $customer: CustomerUpdateInput!
  ) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: $customer
    ) {
      customer {
        id
        firstName
        lastName
        email
        phone
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const GET_CUSTOMER_ORDERS = `
  query getCustomerOrders(
    $customerAccessToken: String!
    $first: Int!
    $after: String
    $sortKey: OrderSortKeys
    $reverse: Boolean
  ) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(
        first: $first
        after: $after
        sortKey: $sortKey
        reverse: $reverse
      ) {
        edges {
          node {
            id
            orderNumber
            name
            processedAt
            financialStatus
            fulfillmentStatus
            lineItems(first: 100) {
              nodes {
                currentQuantity
                title
                originalTotalPrice {
                  amount
                  currencyCode
                }
                variant {
                  image {
                    url
                  }
                  product {
                    handle
                  }
                }
              }
            }
            shippingAddress {
              name
              company
              city
              country
              address1
              address2
            }
            totalPrice {
              amount
              currencyCode
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;

export const GET_CUSTOMER = `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      defaultAddress {
        id
        firstName
        lastName
        company
        address1
        address2
        city
        province
        country
        zip
        phone
      }
    }
  }
`;

export const CUSTOMER_ADDRESS_UPDATE = `
  mutation customerAddressUpdate(
    $customerAccessToken: String!
    $id: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(
      customerAccessToken: $customerAccessToken
      id: $id
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

