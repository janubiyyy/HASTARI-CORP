import React from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";

import ExTable2 from "../dashboards/dashboard1-components/ExTable2";

const BasicTable2 = () => {
    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3">Data Ternak</Typography>
                    <br />
                    <Box
                        sx={{
                            overflow: {
                                xs: "auto",
                                sm: "unset",
                            },
                        }}
                    >
                        <ExTable2 />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default BasicTable2;
