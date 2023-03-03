import { OrderHeaderSelectionModel } from "../order-header/order-header-selection.model";
import { ProductSelectionModel } from "../product/product-selection.model";
import { OrderDetailsModel } from "./order-details.model";

export interface OrderDetailsEditionModel extends OrderDetailsModel {
    id: number;
    orderHeaderId: number;
    orderHeader: OrderHeaderSelectionModel;
    product: ProductSelectionModel;
}
