export enum RestApiQueryParamsEnum {
    SORT = "sort",
    FIELDS = "fields",
    CREATED_DATE_GTE = "createdDate.gte",
    CREATED_DATE_LTE = "createdDate.lte",
}

export type RestApiQueryParams = {
    [key in RestApiQueryParamsEnum]: string;
}