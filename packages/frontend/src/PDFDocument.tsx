import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Response } from "./App";

export default function PDFDocument({ response } : { response: Response }) {
    const styles = StyleSheet.create({
        page: {
            padding: 32
        },
        text: {
            fontSize: 14,
            marginBottom: 16,
            lineHeight: 1.2
        }
    });

    return (
        <Document>
            {response.output.map(function(value, index) {
                if (value.sending) return;
                return (
                    <Page size={"A4"} key={index} style={styles.page}>
                        <View>
                            <Text style={styles.text}>Questions for {value.name}</Text>
                            {value.questions?.map(function(value2, index2) {
                                return (
                                    <>
                                        <Text style={styles.text} key={index2}>{index2 + 1}. {value2}</Text>
                                        <Text style={styles.text}>__________________________________________</Text>
                                    </>
                                );
                            })}
                        </View>
                    </Page>
                );
            })}
        </Document>
    );
}
