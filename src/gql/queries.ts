import gql from 'graphql-tag'

export const GET_TARIFFS = gql`
  query GetTariffs {
    tariffs {
      id
      percent
      days
      constraints {
        currencyId
        minAmount
        maxAmount
      }
    }
  }
`
export const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      id
      template
    }
  }
`
export const GET_ACCOUNT = gql`
  query GetAccount {
    account {
      id
      displayName
      picture
      fbPixelId
    }
  }
`
export const GET_BALANCES = gql`
  query GetBalances {
    balances {
      currencyId
      amount
    }
  }
`
export const INVESTMENT_DATA = gql`
  fragment InvestmentData on InvestmentViewEntity {
    id
    createdAt
    investmentTariffId
    amount
    rate
    currencyId
    endsAt
    isReady
    estimatedPayoutAmount
    actualPayoutAmount
    payoutDate
  }
`
export const GET_INVESTMENT = gql`
  query GetInvestment($id: String!) {
    investment(id: $id) {
      ...InvestmentData
    }
  }
  ${INVESTMENT_DATA}
`
export const GET_INVESTMENTS = gql`
  query GetInvestments {
    investments {
      ...InvestmentData
    }
  }
  ${INVESTMENT_DATA}
`
export const CREATE_INVESTMENT = gql`
  mutation CreateInvestment(
    $amount: Float!
    $currencyId: String!
    $investmentTariffId: String!
  ) {
    createInvestment(
      data: {
        amount: $amount
        currencyId: $currencyId
        investmentTariffId: $investmentTariffId
      }
    ) {
      ...InvestmentData
    }
  }
  ${INVESTMENT_DATA}
`
export const CLOSE_INVESTMENT = gql`
  mutation CloseInvestment($id: String!) {
    closeInvestment(id: $id) {
      ...InvestmentData
    }
  }
  ${INVESTMENT_DATA}
`
export const GET_INVOICES = gql`
  query GetInvoices {
    invoices {
      id
      accountId
      amount
      currencyId
      status
      createdAt
    }
  }
`
export const AFFILIATE_BIND = gql`
  mutation AffiliateBind($referrerId: String, $fbPixelId: String) {
    affiliateBind(data: { referrerId: $referrerId, fbPixelId: $fbPixelId })
  }
`
export const GET_AFFILIATE_TOTALS = gql`
  query GetAffiliateTotals {
    affiliateTotals {
      currencyId
      total
    }
  }
`
export const GET_AFFILIATE_REFERRALS = gql`
  query GetAffiliateReferrals {
    affiliateReferrals {
      id
      displayName
      picture
      totals {
        currencyId
        total
      }
    }
  }
`
export const GET_AFFILIATE_ACCRUALS = gql`
  query GetAffiliateAccruals {
    affiliateAccruals {
      id
      createdAt
      currencyId
      amount
      rate
      referral {
        id
        displayName
        picture
      }
    }
  }
`

export const PAYOUT_DATA = gql`
  fragment PayoutData on PayoutEntity {
    id
    createdAt
    accountId
    currencyId
    amount
    payoutMethodId
    isSuccess
    operatorComment
    details
  }
`
export const CREATE_PAYOUT = gql`
  mutation CreatePayout(
    $amount: Float!
    $currencyId: String!
    $payoutMethodId: String!
    $details: String!
  ) {
    createPayout(
      data: {
        amount: $amount
        currencyId: $currencyId
        payoutMethodId: $payoutMethodId
        details: $details
      }
    ) {
      ...PayoutData
    }
  }
  ${PAYOUT_DATA}
`
export const GET_PAYOUTS = gql`
  query GetPayouts {
    payouts {
      ...PayoutData
    }
  }
  ${PAYOUT_DATA}
`
export const GET_PAYOUT_METHODS = gql`
  query GetPayoutMethods {
    payoutMethods {
      id
      currencyId
      rate
      minAmount
      maxAmount
    }
  }
`
