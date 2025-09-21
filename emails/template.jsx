import { Body, Button, Container, Head, Heading, Html, Preview, Text } from "@react-email/components";
import * as React from "react";

export default function Email({
    userName= "",
    type= "budget-alert",
    data= {},
}) {
    if (type === "monthy-report") {
        
    }

    if (type === "budget-alert") {
        return (
        <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
            <Container style={styles.container}>
                <Heading style={styles.title}>Budget Alert</Heading>
                <Text style={styles.text}>Hello {userName},</Text>
            </Container>
        </Body>
        </Html>
    );
        
    }
}


const styles = {
    body: {
        backgroundColor: "#f6f9fc",
        fontFamilu: "-apple-system, sans-serif"
    }
}