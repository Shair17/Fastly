package utils

import (
	"regexp"
)

func BuildFacebookUri(access_token string) string {
	return "https://graph.facebook.com/me?access_token=" + access_token
}

func GetAgeFromDate() {}

func IsValidToken(token string) bool {
	// TODO: exp -> expresion reguaklar
	match, err := regexp.MatchString("exp", token)

	if err != nil {
		return false
	}

	return match
}
