package main

import (
	"github.com/Shair17/go-fastly/controllers"
	"github.com/Shair17/go-fastly/database"

	"flag"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

var (
	port = flag.String("port", ":4000", "Port to listen on")
	prod = flag.Bool("prod", false, "Enable prefork in Production")
)

func main() {
	flag.Parse()

	database.Connect()

	app := fiber.New(fiber.Config{
		Prefork: *prod,
	})

	app.Use(recover.New())
	app.Use(logger.New())

	v1 := app.Group("/api/v1")

	// Bind handlers
	v1.Get("/users", controllers.UserList)
	v1.Post("/users", controllers.UserCreate)

	// Setup static files
	app.Static("/", "./static/public")

	// Handle not founds
	app.Use(controllers.NotFound)

	log.Fatal(app.Listen(*port)) // go run app.go -port=:3000
}
