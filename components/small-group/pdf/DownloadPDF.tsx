import Icons from "@/components/utils/Icons";
import { SmallGroupItem } from "@/store/small-group/type";
import { IconButton } from "@mui/material";
import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "stretch",
  },
  cell: {
    padding: "2px",
    border: "1px solid #000",
    width: 100,
  },
  text: {
    fontSize: 7,
  },
});

function Print({ pg }: { pg: SmallGroupItem }) {
  return (
    <Document>
      <Page
        orientation="landscape"
        size={"A4"}
        style={{
          width: "100%",
          padding: "5px",
        }}
      >
        <Text style={{ textAlign: "center", marginBottom: 10, fontSize: 12 }}>
          Liste des membres du petit groupe {pg.nom}
        </Text>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.text}>Codage</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>Région</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>District</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>Commune</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>Fokontany</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>Village</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>Nom PG</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>Nombre membre</Text>
          </View>
          <View style={{ ...styles.cell, width: 120 }}>
            <Text style={styles.text}>Nom et prénoms</Text>
          </View>
          <View style={{ ...styles.cell, width: 60 }}>
            <Text style={styles.text}>Sexe</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>Année</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>CIN</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>Téléphone</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>Riziculture</Text>
          </View>
        </View>
        {pg.members.map((row) => {
          return (
            <View key={row.id} style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.text}>{pg.code}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{pg.region}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{pg.district}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.commune}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.fokontany}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.village}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{pg.nom}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{pg._count?.members}</Text>
              </View>
              <View style={{ ...styles.cell, width: 120 }}>
                <Text style={styles.text}>{row.nom_prenom_membre}</Text>
              </View>
              <View style={{ ...styles.cell, width: 60 }}>
                <Text style={styles.text}>{row.genre}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}></Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.cin}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.tel}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}></Text>
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}

export default function DownloadPDF({ pg }: { pg: SmallGroupItem }) {
  return (
    <PDFDownloadLink
      document={<Print pg={pg} />}
      download={`Membres-${pg.nom}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          "loading"
        ) : (
          <IconButton>
            <Icons name="Download" />
          </IconButton>
        )
      }
    </PDFDownloadLink>
  );
}
