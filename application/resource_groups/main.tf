variable "resource_groups" {
  description = "Map of resource group names to properties"
  type        = map(object({
    location = optional(string, "westeurope")
    tags     = optional(map(string), { "owner" = "none.given" })
  }))
  default     = {}
}


resource "azurerm_resource_group" "rg" {
  for_each = var.resource_groups

  name     = each.key
  location = lookup(each.value, "location")
  tags     = lookup(each.value, "tags")
}