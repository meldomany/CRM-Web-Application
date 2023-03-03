import { OrderHeaderSelectionModel } from "../order-header/order-header-selection.model";
import { ProductSelectionModel } from "../product/product-selection.model";
import { OrderDetailsModel } from "./order-details.model";

export interface OrderDetailsCreationModel extends OrderDetailsModel {
    orderHeader: OrderHeaderSelectionModel;
    product: ProductSelectionModel;
}