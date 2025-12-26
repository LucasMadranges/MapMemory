package user

import (
	"context"
	"net/url"

	"github.com/LucasMadranges/MapMemory/ent"
	"github.com/LucasMadranges/MapMemory/ent/user"
	"github.com/LucasMadranges/MapMemory/internal/config"
	"github.com/LucasMadranges/MapMemory/utils/bcrypt"
	"github.com/LucasMadranges/MapMemory/utils/request"
	"github.com/LucasMadranges/MapMemory/utils/validation"
	"github.com/gofiber/fiber/v2"
)

// GetUsers godoc
// @Summary Get all users
// @Description Retrieve a list of all users
// @Tags Users
// @Produce json
// @Success 201 {array} request.SuccessGetAllRequest "List of users"
// @Failure 400 {object} request.ErrorRequest "Failed to retrieve users"
// @Failure 500 {object} request.ErrorRequest "Internal server error"
// @Router /users [get]
func GetUsers(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		user, err := client.User.Query().
			All(context.Background())

		if err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success: false,
				Message: "Échec de la récupération des utilisateurs",
			})
		}

		return c.Status(201).JSON(request.SuccessGetAllRequest{
			Success: true,
			Data:    user,
		})
	}
}

// CreateUser godoc
// @Summary Create user
// @Description Create a new user account
// @Tags Users
// @Accept json
// @Produce json
// @Param user body CreateUserDTO true "User payload"
// @Success 201 {object} request.SuccessCreateRequest "User created successfully"
// @Failure 400 {object} request.ErrorRequest "Invalid request body"
// @Failure 409 {object} request.ErrorRequest "User already exists"
// @Failure 500 {object} request.ErrorRequest "Internal server error"
// @Router /users [post]
func CreateUser(client *ent.Client) fiber.Handler {
	err := validation.ValidatePassword(config.Validate)

	if err != nil {
		return nil
	}

	return func(c *fiber.Ctx) error {
		var body CreateUserDTO
		if err := c.BodyParser(&body); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Corps de requête invalide",
				Explicit: err.Error(),
			})
		}

		if err := config.Validate.Struct(body); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Données invalides",
				Explicit: err.Error(),
			})
		}

		hash, err := bcrypt.HashPassword(body.Password)

		if err != nil {
			return c.Status(500).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Erreur lors du hachage du mot de passe",
				Explicit: err.Error(),
			})
		}

		user, err := client.User.
			Create().
			SetAvatar(body.Avatar).
			SetNillableRole(body.Role).
			SetFirstname(body.Firstname).
			SetLastname(body.Lastname).
			SetEmail(body.Email).
			SetPassword(hash).
			Save(context.Background())

		if err != nil {
			return c.Status(409).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "L'utilisateur existe déjà",
				Explicit: err.Error(),
			})
		}

		return c.Status(201).JSON(request.SuccessCreateRequest{
			Success: true,
			Data:    user,
		})
	}
}

// DeleteUsersByEmail godoc
// @Summary Delete user by email
// @Description Delete a user account by email
// @Tags Users
// @Param email path string true "User Email"
// @Produce json
// @Success 200 {object} request.SuccessDeleteRequest "User deleted successfully"
// @Failure 404 {object} request.ErrorRequest "User not found"
// @Failure 500 {object} request.ErrorRequest "Internal server error"
// @Router /users/{email} [delete]
func DeleteUsersByEmail(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		email := c.Params("email")

		decodedEmail, err := url.QueryUnescape(email)
		if err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success: false,
				Message: "Email invalide",
			})
		}

		count, err := client.User.Delete().Where(user.EmailEQ(decodedEmail)).Exec(context.Background())

		if err != nil {
			return c.Status(500).JSON(request.ErrorRequest{
				Success: false,
				Message: "Erreur lors de la suppression de l'utilisateur",
			})
		}

		if count == 0 {
			return c.Status(404).JSON(request.ErrorRequest{
				Success: false,
				Message: "L'utilisateur n'existe pas",
			})
		}

		return c.Status(200).JSON(request.SuccessDeleteRequest{
			Success: true,
			Count:   count,
		})
	}
}
