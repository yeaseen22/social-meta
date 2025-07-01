"use client"
import SettingsPage from "@/app/(user)/settings/Settings"
import useAuthGuard from "@/hooks/useAuthGuard"

const SettingPage = () => {
  useAuthGuard();
  return (
    <SettingsPage />
  )
}

export default SettingPage

