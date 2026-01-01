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
// @Success 201 {array} request.SuccessGetAllRequest "Récupérer tous les utilisateurs"
// @Failure 400 {object} request.ErrorRequest "Échec de la récupération des utilisateurs"
// @Failure 500 {object} request.ErrorRequest "Erreur interne"
// @Router /users [get]
func GetUsers(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		user, err := client.User.Query().
			All(context.Background())

		if err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Échec de la récupération des utilisateurs",
				Explicit: err.Error(),
			})
		}

		return c.Status(201).JSON(request.SuccessGetAllRequest{
			Success: true,
			Data:    user,
		})
	}
}

// GetUserByEmail godoc
// @Summary Get user by email
// @Description Retrieve a user account by email
// @Tags Users
// @Param email path string true "User Email"
// @Produce json
// @Success 201 {array} request.SuccessGetAllRequest "Récupérer un utilisateur par email"
// @Failure 400 {object} request.ErrorRequest "Échec de la récupération de l'utilisateur"
// @Failure 404 {object} request.ErrorRequest "Utilisateur non trouvé"
// @Failure 500 {object} request.ErrorRequest "Erreur interne"
// @Router /users/{email} [get]
func GetUserByEmail(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		user, err := client.User.Query().Where(user.EmailEQ(c.Params("email"))).
			All(context.Background())

		if err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Échec de la récupération des utilisateurs",
				Explicit: err.Error(),
			})
		}

		if len(user) == 0 {
			return c.Status(404).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Utilisateur non trouvé",
				Explicit: "No user found with the provided email",
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
// @Success 201 {object} request.SuccessCreateRequest "Utilisateur créé avec succés"
// @Failure 400 {object} request.ErrorRequest "Corps de requête invalide"
// @Failure 400 {object} request.ErrorRequest "Données invalides"
// @Failure 409 {object} request.ErrorRequest "Utilisateur déjà existant"
// @Failure 500 {object} request.ErrorRequest "Erreur interne"
// @Router /users [post]
func CreateUser(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var body CreateUserDTO

		if err := validation.ValidatePassword(config.Validate); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Corps de requête invalide",
				Explicit: err.Error(),
			})
		}

		if err := c.BodyParser(&body); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Corps de requête invalide",
				Explicit: err.Error(),
			})
		}

		// TODO : Status à vérifier
		if err := config.Validate.Struct(body); err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Données invalides",
				Explicit: err.Error(),
			})
		}

		hash, err := bcrypt.HashPassword(body.Password)

		// TODO : Status à vérifier
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
// @Success 200 {object} request.SuccessDeleteRequest "Utilisateur supprimé avec succés"
// @Failure 400 {object} request.ErrorRequest "Email invalide"
// @Failure 404 {object} request.ErrorRequest "Utilisateur non trouvé"
// @Failure 500 {object} request.ErrorRequest "Erreur interne"
// @Router /users/{email} [delete]
func DeleteUsersByEmail(client *ent.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		email := c.Params("email")

		decodedEmail, err := url.QueryUnescape(email)
		if err != nil {
			return c.Status(400).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Email invalide",
				Explicit: err.Error(),
			})
		}

		count, err := client.User.Delete().Where(user.EmailEQ(decodedEmail)).Exec(context.Background())

		if err != nil {
			return c.Status(500).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "Erreur lors de la suppression de l'utilisateur",
				Explicit: err.Error(),
			})
		}

		if count == 0 {
			return c.Status(404).JSON(request.ErrorRequest{
				Success:  false,
				Message:  "L'utilisateur n'existe pas",
				Explicit: "No user found with the provided email",
			})
		}

		return c.Status(200).JSON(request.SuccessDeleteRequest{
			Success: true,
			Count:   count,
		})
	}
}
