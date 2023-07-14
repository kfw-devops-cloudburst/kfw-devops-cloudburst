provider "azurerm" {
  features {}
}

data "azurerm_container_registry" "acr" {
  name                = "acrmanual"
  resource_group_name = "cloudburst-rg-manual"
}

output "acr_login_server" {
  value = data.azurerm_container_registry.acr.login_server
}
