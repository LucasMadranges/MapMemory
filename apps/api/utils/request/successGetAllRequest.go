package request

type SuccessGetAllRequest struct {
	Success bool `json:"success" example:"true"`
	Data    any  `json:"data"`
}
