package user

import (
	"context"

	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/LucasMadranges/MapMemory/internal/config"
	"github.com/LucasMadranges/MapMemory/utils/bcrypt"
	"github.com/LucasMadranges/MapMemory/utils/errors"
	"github.com/LucasMadranges/MapMemory/utils/validation"
	"github.com/gofiber/fiber/v2"
)

// GetUsers godoc
// @Summary Get all users
// @Description Retrieve a list of all users
// @Tags Users
// @Produce json
// @Success 201 {array} ent.User "List of users"
// @Failure 400 {object} errors.ErrorRequest "Failed to retrieve users"
// @Failure 500 {object} errors.ErrorRequest "Internal server error"
// @Router /users [get]
func GetUsers(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		user, err := client.User.Query().
			All(context.Background())

		if err != nil {
			return c.Status(400).JSON(errors.ErrorRequest{
				Success: false,
				Message: err.Error(),
			})
		}

		return c.Status(201).JSON(user)
	}
}

// CreateUser godoc
// @Summary Create user
// @Description Create a new user account
// @Tags Users
// @Accept json
// @Produce json
// @Param user body CreateUserDTO true "User payload"
// @Success 201 {object} ent.User "User created successfully"
// @Failure 400 {object} errors.ErrorRequest "Invalid request body"
// @Failure 409 {object} errors.ErrorRequest "User already exists"
// @Failure 500 {object} errors.ErrorRequest "Internal server error"
// @Router /users [post]
func CreateUser(client *ent.Client) fiber.Handler {
	err := validation.ValidatePassword(config.Validate)

	if err != nil {
		return nil
	}

	return func(c *fiber.Ctx) error {
		var body CreateUserDTO
		if err := c.BodyParser(&body); err != nil {
			return c.Status(400).JSON(errors.ErrorRequest{
				Success: false,
				Message: err.Error(),
			})
		}

		if err := config.Validate.Struct(body); err != nil {
			return c.Status(400).JSON(errors.ErrorRequest{
				Success: false,
				Message: err.Error(),
			})
		}

		hash, err := bcrypt.HashPassword(body.Password)

		if err != nil {
			return c.Status(500).JSON(errors.ErrorRequest{
				Success: false,
				Message: err.Error(),
			})
		}

		user, err := client.User.
			Create().
			SetAvatar(body.Avatar).
			SetFirstname(body.Firstname).
			SetLastname(body.Lastname).
			SetEmail(body.Email).
			SetPassword(hash).
			Save(context.Background())

		if err != nil {
			return c.Status(409).JSON(errors.ErrorRequest{
				Success: false,
				Message: err.Error(),
			})
		}

		return c.Status(201).JSON(user)
	}
}
