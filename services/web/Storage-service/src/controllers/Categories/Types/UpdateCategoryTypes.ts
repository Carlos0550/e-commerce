import { QueryWithUserId } from "../../../Types/QueryWithUserId";

export interface UpdateCategoryQuery extends QueryWithUserId{
    category_id: string
}