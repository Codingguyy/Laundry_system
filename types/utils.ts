import { Garment } from "./order"
import { Status } from "./order"
export type garment_value={
    value:Garment|Status,
    label:Garment|Status
}
export type drop_down={
    options:garment_value[],
    onChange:Function,
    value:Garment|Status
}