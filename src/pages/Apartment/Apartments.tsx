import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import Axios from "../../config/axios";

export default function ApartmentPage() {
  const auth = useAuth();
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    Axios.get("/apartment")
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <div>
      signed in as: {auth.user?.email}
    </div>
  )
}