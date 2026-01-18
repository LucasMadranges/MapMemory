package validation

import (
	"regexp"

	"github.com/go-playground/validator/v10"
)

func ValidateColor(validate *validator.Validate) error {
	return validate.RegisterValidation("color", func(fl validator.FieldLevel) bool {
		color := fl.Field().String()

		return regexp.MustCompile("^#[0-9A-Fa-f]{6}$").MatchString(color)
	})
}
