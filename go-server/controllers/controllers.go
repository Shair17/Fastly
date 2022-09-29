package controllers

import (
	"github.com/Shair17/go-fastly/database"
	"github.com/Shair17/go-fastly/models"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/utils"
)

// UserGet returns a user
func UserList(c *fiber.Ctx) error {
	users := database.Get()

	return c.JSON(fiber.Map{
		"success": true,
		"users":   users,
	})
}

// UserCreate registers a user
func UserCreate(c *fiber.Ctx) error {
	user := &models.User{
		// Note: when writing to external database,
		// we can simply use - Name: c.FormValue("user")
		Name: utils.CopyString(c.FormValue("user")),
	}
	database.Insert(user)

	return c.JSON(fiber.Map{
		"success": true,
		"user":    user,
	})
}

func NotFound(c *fiber.Ctx) error {
	return c.Status(404).JSON(fiber.Map{
		"error":      "Not Found",
		"statusCode": 404,
	})

	// "message": "Route GET:/ not found",
	// "error": "Not Found",
	// "statusCode": 404
}
