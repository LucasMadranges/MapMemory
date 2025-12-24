package user

import (
	"context"

	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/gofiber/fiber/v2"
)

// CreateUser godoc
// @Summary Create user
// @Description Create a new user account
// @Tags Users
// @Accept json
// @Produce json
// @Param user body CreateUserDTO true "User payload"
// @Success 201 {object} ent.User "User created successfully"
// @Failure 400 {object} map[string]string "Invalid request body or user creation failed"
// @Router /users [post]
func CreateUser(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var body CreateUserDTO
		if err := c.BodyParser(&body); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": err.Error()})
		}

		user, err := client.User.
			Create().
			SetAvatar(body.Avatar).
			SetFirstname(body.Firstname).
			SetLastname(body.Lastname).
			SetEmail(body.Email).
			SetPassword(body.Password).
			Save(context.Background())

		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": err.Error()})
		}

		return c.Status(201).JSON(user)
	}
}
