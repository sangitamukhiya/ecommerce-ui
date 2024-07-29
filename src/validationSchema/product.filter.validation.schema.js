import * as Yup from "yup";
import { productCategories } from "../constants/general.constant";

export const productFilterValidation = Yup.object({
  Category: Yup.string().oneOf(productCategories),
  minPrice: Yup.number().min(0, "Min price cannot be negative."),
  maxPrice: Yup.number().min(0, "max price cannot be negative."),
});
