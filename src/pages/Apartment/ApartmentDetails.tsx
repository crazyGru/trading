import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

export default function ApartmentPage() {
  const auth = useAuth();
  const { id } = useParams();

  return (
    <>
      <div>
        signed in as: {auth.user?.email}
      </div>
      <div>
        params: {id}
      </div>
    </>
  )
}