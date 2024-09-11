import { MemberItem } from "@/store/member/type";
import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
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

function Print({ data, commune }: { data: MemberItem[]; commune: string }) {
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
          Liste des membres de la commune {commune}
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
          <View style={styles.cell}>
            <Text style={styles.text}>Nom et prénoms</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>Sexe</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>Age</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>CIN</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.text}>Téléphone</Text>
          </View>
        </View>
        {data.map((row, index: number) => {
          return (
            <View key={row.id} style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.smallGroup?.code}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.smallGroup?.region}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.smallGroup?.district}</Text>
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
                <Text style={styles.text}>{row.smallGroup?.nom}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>
                  {row.smallGroup?._count?.members}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.nom_prenom_membre}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.genre}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.age}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.cin}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.text}>{row.tel}</Text>
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}

export default function DownloadPDF({
  members,
  commune,
}: {
  members: MemberItem[];
  commune: string;
}) {
  return (
    <PDFDownloadLink
      document={<Print data={members} commune={commune} />}
      download={`Membres-${commune}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          "loading"
        ) : (
          <Button startIcon={<Download />} variant="contained" color="primary">
            PDF
          </Button>
        )
      }
    </PDFDownloadLink>
  );
}
