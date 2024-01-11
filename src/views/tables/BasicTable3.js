import React from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";

import ExTable3 from "../dashboards/dashboard1-components/ExTable3";

const BasicTable3 = () => {
    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3">Data Lalu Lintas Ternak</Typography>
                    <br />
                    <Box
                        sx={{
                            overflow: {
                                xs: "auto",
                                sm: "unset",
                            },
                        }}
                    >
                        <ExTable3 />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default BasicTable3;
