package schema

import (
	"fmt"
	"regexp"
	"unicode"

	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

var emailRegex = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Default(uuid.New).Immutable(),
		field.String("avatar"),
		field.String("firstname").NotEmpty().MinLen(2).MaxLen(100),
		field.String("lastname").NotEmpty().MinLen(2).MaxLen(100),
		field.String("email").NotEmpty().MinLen(10).MaxLen(100).Unique().Match(emailRegex),
		field.String("password").NotEmpty().MinLen(12).MaxLen(100).Sensitive().Validate(func(s string) error {
			if len(s) < 12 {
				return fmt.Errorf("le mot de passe doit faire au moins 12 caractères")
			}

			var hasLower, hasUpper, hasDigit, hasSpecial bool
			for _, char := range s {
				switch {
				case unicode.IsLower(char):
					hasLower = true
				case unicode.IsUpper(char):
					hasUpper = true
				case unicode.IsDigit(char):
					hasDigit = true
				case unicode.IsPunct(char) || unicode.IsSymbol(char):
					hasSpecial = true
				}
			}

			if !hasLower || !hasUpper || !hasDigit || !hasSpecial {
				return fmt.Errorf("le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial")
			}

			return nil
		}),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return nil
}
