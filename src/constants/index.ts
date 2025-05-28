export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum UserRoles {
  SUPER_ADMIN = 'superadmin',
  ADMIN = 'admin',
  SELLER = 'seller',
  CUSTOMER = 'customer',
}

export enum PaymentTypes {
  CARD = 'card',
  CASH = 'cash',
  INSTALLMENT = 'installment',
}
export enum OrderStatus {
  ACCEPTED = 'accepted',
  PREPARING = 'preparing',
  DELIVERING = 'delivering',
  CLOSED = 'closed',
}

export enum Rating {
  WORSE = 1,
  BAD = 2,
  NORMAL = 3,
  GOOD = 4,
  VERY_GOOD = 5,
}
