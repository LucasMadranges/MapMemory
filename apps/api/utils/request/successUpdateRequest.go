package request

type SuccessUpdateRequest struct {
	Success bool `json:"success" example:"true"`
	Count   int  `json:"count" example:"0"`
}
