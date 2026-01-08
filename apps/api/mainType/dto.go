package subType

type CreateSubTypeDto struct {
	Name string `json:"name" example:"Restaurant" validate:"required,max=25"`
}
