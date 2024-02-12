import { EditRounded, RemoveRedEyeOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { IconButton, Tooltip } from "@mui/material";
import { Card, Image, Tag } from "antd";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useSwr from "swr";
import { ActContext } from "../../../App";
import { PUT } from "../../../api/Request";
import { iconButton, loadingBtn } from "../../../styled";
import MembreDialog from "../../Dialog/Pg/MembreDialog";
import Person from "../../Dialog/Pg/Person";
import CustomTag from "../../Outils/CustomTag";
import LottieLoading from "../../Outils/LottieLoading";

const fetcher = async (url) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const json = await res.json();
  return json.data;
};

export default function PG() {
  const { pg } = useParams();
  const { setAlert, user } = useContext(ActContext);
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState();
  const { isLoading, data, error, mutate } = useSwr(
    `${process.env.REACT_APP_API}/petit-groupe/${pg}`,
    fetcher
  );
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <LottieLoading size={50} speed={1} />
      </div>
    );
  if (error)
    return <div className="flex justify-center items-center">Erreur...</div>;

  const validerPg = async () => {
    setLoading(true);
    try {
      const res = await PUT(
        `${process.env.REACT_APP_API}/petit-groupe/check`,
        pg,
        {
          id_staff_verificateur: user.id,
        }
      );
      if (!res.success) throw new Error(res.message);
      if (res.success) {
        setAlert({
          message: "Petit groupe validé avec succès",
          type: "success",
        });
        mutate(res.data, false);
      }
    } catch (error) {
      console.log(error);
      setAlert({
        message: "Erreur lors de la validation du petit groupe",
        type: "error",
      });
    }
    setLoading(false);
  };
  return (
    <div id="container">
      <div className="w-full">
        <Image
          height={400}
          width="100%"
          style={{ objectFit: "cover", borderRadius: "10px" }}
          src={`${process.env.REACT_APP_STORAGE}/storage/${data.photo_pg}`}
        />
      </div>
      <div className="prose flex justify-center min-w-full my-2">
        <h1>{data.nom_pg}</h1>
      </div>
      <div className="flex justify-between gap-3">
        <Card title="LOCALISATION" style={{ width: "50%", minWidth: 300 }}>
          <div className="prose min-w-full">
            <div className="mx-3">
              <div className="flex gap-3">
                <strong>Région:</strong>
                <p className="m-0">{data.region}</p>
              </div>
              <div className="flex gap-3">
                <strong>District:</strong>
                <p className="m-0">{data.district}</p>
              </div>
              <div className="flex gap-3">
                <strong>Commune:</strong>
                <p className="m-0">{data.commune}</p>
              </div>
              <div className="flex gap-3">
                <strong>Fokontany:</strong>
                <p className="m-0">{data.fokontany}</p>
              </div>
            </div>
          </div>
        </Card>
        <Card title="COORDONNEE" style={{ width: "50%", minWidth: 300 }}>
          <div className="prose min-w-full">
            <div className="mx-3">
              <div className="flex gap-3">
                <strong>Téléphone N° 1:</strong>
                <p className="m-0">{data.phone1}</p>
              </div>
              <div className="flex gap-3">
                <strong>Téléphone N° 2:</strong>
                <p className="m-0">{data.phone2}</p>
              </div>
              <div className="flex gap-3">
                <strong>Téléphone N° 3:</strong>
                <p className="m-0">{data.phone3}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex gap-3 justify-between mt-4">
        <Card title="INFORMATIONS" style={{ width: "50%", minWidth: 300 }}>
          <div className="prose min-w-full">
            <div className="mx-3">
              <div className="flex gap-3">
                <strong>Issue de trois familles différentes:</strong>
                <CustomTag bool={data.issue_famille_different} />
              </div>
              <div className="flex gap-3">
                <strong>Suivi formation:</strong>
                <CustomTag bool={data.suivi_formation} />
              </div>
              <div className="flex gap-3">
                <strong>Pépinière :</strong>
                <CustomTag bool={data.avoir_terrain_pepiniere} />
              </div>
              <div className="flex gap-3">
                <strong>Nombre de sémis:</strong>
                <p className="m-0">{data.nb_semis}</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <strong>Types de sémis:</strong>
                {data.type_semis &&
                  data.type_semis
                    .split(";")
                    .map((type, index) => <Tag key={index}>{type}</Tag>)}
              </div>
              <div className="flex flex-col">
                <strong>Photos de pépinière:</strong>
                <Image.PreviewGroup
                  items={
                    data?.photo_pepiniere
                      ?.split(";")
                      .map(
                        (photo) =>
                          `${process.env.REACT_APP_STORAGE}/storage/${photo}`
                      ) ?? []
                  }
                >
                  <Image
                    width={150}
                    src={
                      `${process.env.REACT_APP_STORAGE}/storage/${
                        data?.photo_pepiniere?.split(";")[0]
                      }` ?? ""
                    }
                  />
                </Image.PreviewGroup>
              </div>
            </div>
          </div>
        </Card>
        <Card
          title="TERRAINS ET ARBRES"
          style={{ width: "50%", minWidth: 300 }}
        >
          <div className="prose min-w-full">
            <div className="mx-3">
              <div className="flex gap-3">
                <strong>Déjà planté des arbres :</strong>
                <CustomTag bool={data.avoir_terrain_pepiniere} />
              </div>
              <div className="flex gap-3">
                <strong>Nombre d'arbre plantés:</strong>
                <p className="m-0">{data.nb_arbre}</p>
              </div>
              <div className="flex gap-3">
                <strong>Date de plantation:</strong>
                <p className="m-0">
                  {new Date(data.plantation_date).toLocaleString("fr", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <strong>Types d'arbre:</strong>
                {data.type_arbre &&
                  data.type_arbre
                    .split(";")
                    .map((type, index) => <Tag key={index}>{type}</Tag>)}
              </div>
              <div className="flex flex-col">
                <strong>Photos du terrain:</strong>
                <Image.PreviewGroup
                  items={
                    data?.photo_arbre
                      ?.split(";")
                      .map(
                        (photo) =>
                          `${process.env.REACT_APP_STORAGE}/storage/${photo}`
                      ) ?? []
                  }
                >
                  <Image
                    width={150}
                    src={
                      `${process.env.REACT_APP_STORAGE}/storage/${
                        data?.photo_arbre?.split(";")[0]
                      }` ?? ""
                    }
                  />
                </Image.PreviewGroup>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div>
        <Card title="MEMBRES" className="mt-4" style={{ minWidth: 300 }}>
          <div className="flex">
            {data.membres.map((membre, index) => (
              <div key={index} className="relative">
                <Tooltip title="Noter">
                  <IconButton
                    onClick={() => {}}
                    sx={{
                      ...iconButton,
                      position: "absolute",
                      top: -5,
                      right: -10,
                    }}
                  >
                    <EditRounded />
                  </IconButton>
                </Tooltip>
                <div
                  onClick={() =>
                    setDialog(<MembreDialog close={setDialog} user={membre} />)
                  }
                >
                  <Person user={membre} />
                </div>
              </div>
            ))}
            {data.membres.length === 0 && (
              <div className="flex justify-center items-center w-full">
                <i>Aucun membre</i>
              </div>
            )}
          </div>
        </Card>
      </div>
      <div className="mt-4 flex w-full justify-center gap-3 flex-wrap">
        {!data.id_staff_verificateur ? (
          <LoadingButton
            startIcon={<EditRounded />}
            sx={loadingBtn}
            type="button"
            onClick={validerPg}
            loading={loading}
            loadingIndicator={<LottieLoading size={50} speed={1} />}
          >
            Valider
          </LoadingButton>
        ) : (
          <LoadingButton
            startIcon={<RemoveRedEyeOutlined />}
            sx={{
              ...loadingBtn,
              backgroundColor: "rgb(8, 23, 27)",
            }}
            type="button"
            loadingIndicator={<LottieLoading size={50} speed={1} />}
          >
            Voir Bosquet
          </LoadingButton>
        )}
      </div>
      {dialog}
    </div>
  );
}
