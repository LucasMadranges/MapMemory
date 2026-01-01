package request

type SuccessDeleteRequest struct {
	Success bool `json:"success" example:"true"`
	Count   int  `json:"count" example:"0"`
}
