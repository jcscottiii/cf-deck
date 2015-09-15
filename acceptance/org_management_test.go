// +build acceptance

package acceptance

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"github.com/sclevine/agouti"
	. "github.com/sclevine/agouti/matchers"

	"net/http/httptest"
)

var _ = Describe("OrgManagement", func() {
	var (
		page        *agouti.Page
		server      *httptest.Server
		testEnvVars acceptanceTestEnvVars
		user        User
	)

	testEnvVars = acceptanceTestEnvVars{}
	testEnvVars.loadTestEnvVars()

	BeforeEach(func() {
		// Start a test server
		server, testEnvVars = startServer()

		// Create a fresh page to navigate.
		page = createPage()

		// Create user
		user = startUserSessionWith(testEnvVars)

		// Log user in
		user.LoginTo(page)
	})

	It("Should allow a user to do org management", func() {

		By("allowing user to navigate to an org", func() {
			Eventually(Expect(page.Find("#orgs-dropdown-btn").Click()).To(Succeed()))
			Eventually(Expect(page.First("orgs-dropdown-menu li a").Click()).To(Succeed()))
		})

		By("allowing a user to navigate to user management page", func() {
			delayForRendering()
			Expect(page.Find("#org-dropdown-btn").Click()).To(Succeed())
			Eventually(Expect(page.FindByName("Manage Org")).To(BeFound()))
			Eventually(Expect(page.FindByName("Manage Org").Click()).To(Succeed()))
		})

		By("allowing a user to get to org management page", func() {
			delayForRendering()
			Expect(page.Find("#current_org_users")).To(BeFound())
		})

		By("allowing user to find at user information", func() {
			var testUser = page.First("org-user-name-data")
			var testUserCols = testUser.Find("td")
			Expect(testUserCols).To(BeFound())
			Expect(testUser.FindByButton("Remove User From Org")).To(BeFound())
		})

		By("allowing a user to remove a user from an org", func() {
			var testUser = page.First("org-user-name-data")
			Expect(testUser).To(BeFound())
		})

		By("allowing user to add a user to an org", func() {
		})
	})

	AfterEach(func() {
		// Logout user
		user.LogoutOf(page)
		// Destroy the page
		Expect(page.Destroy()).To(Succeed())
		// Close the server.
		server.Close()
	})
})
