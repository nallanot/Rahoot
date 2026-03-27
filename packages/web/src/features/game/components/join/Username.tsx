import { STATUS } from "@rahoot/common/types/game/status"
import Button from "@rahoot/web/features/game/components/Button"
import Form from "@rahoot/web/features/game/components/Form"
import Input from "@rahoot/web/features/game/components/Input"
import {
  useEvent,
  useSocket,
} from "@rahoot/web/features/game/contexts/socketProvider"
import { usePlayerStore } from "@rahoot/web/features/game/stores/player"
import { type KeyboardEvent, useState } from "react"
import { useNavigate } from "react-router"
import { useI18n } from "@/i18n"

const Username = () => {
  const { socket } = useSocket()
  const { gameId, login, setStatus } = usePlayerStore()
  const navigate = useNavigate()
  const { t } = useI18n()
  const [username, setUsername] = useState("")

  const handleLogin = () => {
    if (!gameId || !username.trim()) {
      return
    }

    socket?.emit("player:login", { gameId, data: { username: username.trim() } })
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin()
    }
  }

  useEvent("game:successJoin", (gameId) => {
    setStatus(STATUS.WAIT, { text: t("game.waitingPlayers") })
    login(username.trim())

    navigate(`/party/${gameId}`)
  })

  return (
    <Form>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t("auth.usernamePlaceholder")}
      />
      <Button onClick={handleLogin}>{t("common.submit")}</Button>
    </Form>
  )
}

export default Username