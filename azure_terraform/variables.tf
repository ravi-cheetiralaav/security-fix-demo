variable "prefix" {
  description = "Prefix for all resources"
  default     = "demo"
}

variable "location" {
  description = "Region to create resources"
  default     = "australiacentral"
}

variable "admin_password" {
  description = "Virtual Machine admin password"
  default     = "ChangeMe123!"
}
