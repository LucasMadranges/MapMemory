package validation

import (
	"regexp"

	"github.com/go-playground/validator/v10"
)

func ValidatePassword(validate *validator.Validate) error {
	return validate.RegisterValidation("password_strength", func(fl validator.FieldLevel) bool {
		password := fl.Field().String()

		var (
			hasUpper   = regexp.MustCompile(`[A-Z]`).MatchString(password)
			hasLower   = regexp.MustCompile(`[a-z]`).MatchString(password)
			hasDigit   = regexp.MustCompile(`\d`).MatchString(password)
			hasSpecial = regexp.MustCompile(`[@$!%*?&#+\-_=^~.,;:<>]`).MatchString(password)
		)

		return hasUpper && hasLower && hasDigit && hasSpecial
	})
}
