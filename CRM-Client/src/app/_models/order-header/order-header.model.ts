export interface OrderHeaderModel {
    status: boolean;
    tax: number;
    subTotal: number;
    grandTotal: number;
    date: Date;
    customerId: number;
    shippingAddressId: number;
    billingAddressId: number;
}