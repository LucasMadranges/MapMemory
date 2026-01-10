package subType

type CreateSubTypeDto struct {
	Name       string `json:"name" example:"Buffet à volonté" validate:"required,max=25"`
	MainTypeID int    `json:"main_type_id" example:"1" validate:"required"`
}
