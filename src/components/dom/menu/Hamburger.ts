const appContainer = document.getElementById("app") as HTMLDivElement

export class HamburgerMenu {
	public constructor() {
		this.setup()
		this.addEvents()
	}

	private setup(): void {
		const menuContainer = document.createElement("div")
		menuContainer.id = "hamburger-menu"
		menuContainer.classList.add("close")
		menuContainer.innerHTML = `
		<div class="menu-icon">
        	<div class="menu-icon-bar"></div>
        	<div class="menu-icon-bar"></div>
        	<div class="menu-icon-bar"></div>
		</div>
        `
		appContainer.appendChild(menuContainer)
	}

	private addEvents(): void {
		const menuElement = document.getElementById(
			"hamburger-menu"
		) as HTMLDivElement

		menuElement.addEventListener("click", () => {
			if (menuElement.classList.contains("open")) {
				menuElement.classList.remove("open")

				// remove menu-list from hamburger
				const menuList = document.getElementById("menu-list")
				if (menuList) {
					menuElement.removeChild(menuList)
				}

				menuElement.classList.add("close")
			} else {
				menuElement.classList.add("open")
				menuElement.classList.remove("close")

				// add menu-list to hamburger
				const menuList = document.createElement("ul")
				menuList.id = "menu-list"
				menuList.innerHTML = `
				<li class="menu-list-item">Home</li>
				<li class="menu-list-item">About</li>
				<li class="menu-list-item">Portfolio</li>
				<li class="menu-list-item">Contact</li>
				`
				menuElement.appendChild(menuList)
			}
		})

		menuElement.removeEventListener("click", () => {})
	}
}
