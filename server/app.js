import express from "express";
import cors from "cors";
import 'dotenv/config';
import axios from "axios";

const app = express();

app.use(express.json());
app.use(cors());

var ACCESS_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKaGEzTm9hWFJ5WVdvME0wQm5iV0ZwYkM1amIyMGlMQ0poY0dsZmEyVjVJam9pYTJWNVgyeHBkbVZmWjFOWVdVbDBVM0JXZGtVM1YyMW5UMlJ4Um10UGJXVk9NemxWTVVNMVluVWlMQ0pwYzNNaU9pSmhjR2t1YzJGdVpHSnZlQzVqYnk1cGJpSXNJbVY0Y0NJNk1UYzBNVGc1TnpBM05pd2lhVzUwWlc1MElqb2lVa1ZHVWtWVFNGOVVUMHRGVGlJc0ltbGhkQ0k2TVRjeE1ETTJNVEEzTm4wLjRFWUM1VTlYWllvM0h2R2liRkFMTzdkNTlneWtwQXhUXzVfbmRsQnVRbFM3d1pMMENtSEsyVWRVbzRZNWtRWjI4UWV4aE85WTRBVkZIdmFhbjkyUVhBIiwic3ViIjoiYWtzaGl0cmFqNDNAZ21haWwuY29tIiwiYXBpX2tleSI6ImtleV9saXZlX2dTWFlJdFNwVnZFN1dtZ09kcUZrT21lTjM5VTFDNWJ1IiwiaXNzIjoiYXBpLnNhbmRib3guY28uaW4iLCJleHAiOjE3MTA0NDc0NzYsImludGVudCI6IkFDQ0VTU19UT0tFTiIsImlhdCI6MTcxMDM2MTA3Nn0.JwOCc3j9K4uPHGjQdw2Q_v-tWpuqwyze151kl4AlF3vtooYVkBt9xd_lg4C4BkgtkRG2BTO5T_K73NxGE_CqIw";

app.post("/api/test/aadhaar/otp/send", async (req, res) => {
    //
    // apikey, apisecret, apiversion
    // const accessToken = `eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKaGEzTm9hWFJ5WVdvME0wQm5iV0ZwYkM1amIyMGlMQ0poY0dsZmEyVjVJam9pYTJWNVgzUmxjM1JmVUhaUGIyNDJZM2M0UnpCRFdXTkdjVkpSZFhwaFVqZ3dVa0pyTmtoSVRHNGlMQ0pwYzNNaU9pSmhjR2t1YzJGdVpHSnZlQzVqYnk1cGJpSXNJbVY0Y0NJNk1UYzBNVGczT0RBM05Dd2lhVzUwWlc1MElqb2lVa1ZHVWtWVFNGOVVUMHRGVGlJc0ltbGhkQ0k2TVRjeE1ETTBNakEzTkgwLkEzQTRnMGIyaDlrRktmNnc2NjJxSFQ3RzcwMVpmcjBfUkVmOTBoTUtsUmxIX0tvclF4cG5ST0NOV2YwN3JxVE11RjRIWGFka0RNV1JheGZsT1laZTNRIiwic3ViIjoiYWtzaGl0cmFqNDNAZ21haWwuY29tIiwiYXBpX2tleSI6ImtleV90ZXN0X1B2T29uNmN3OEcwQ1ljRnFSUXV6YVI4MFJCazZISExuIiwiaXNzIjoiYXBpLnNhbmRib3guY28uaW4iLCJleHAiOjE3MTA0Mjg0NzQsImludGVudCI6IkFDQ0VTU19UT0tFTiIsImlhdCI6MTcxMDM0MjA3NH0.i-6csMeZywsw2nNhN1tYuUr0t5xykzfhxQsDAR6d870M-PsPlH9GkNR8sqw6-pAzXwaabyIvB5uFlQkw8PXJSw`;
    try {
        const {aadhaarNo} = req.body;
        let accessToken;
        const response = await axios.post(`${process.env.TEST_SANDBOX_URL}/authenticate`, {}, {
            headers: {
                'x-api-key': process.env.TEST_SANDBOX_API_KEY,
                'x-api-secret': process.env.TEST_SANDBOX_API_SECRET,
                'x-api-version': process.env.API_VERSION
            }
        });
        console.log(response.data)
        if (response.data.access_token) {
            accessToken = response.data.access_token;
            const response2 = await axios.post(`${process.env.TEST_SANDBOX_URL}/kyc/aadhaar/okyc/otp`, {aadhaar_number: aadhaarNo}, {
                headers: {
                    'x-api-key': process.env.TEST_SANDBOX_API_KEY,
                    'x-api-version': process.env.API_VERSION,
                    'Authorization': accessToken
                }
            });
            console.log(response2.data.data);
            if (response2.data.data.ref_id && response2.data.data.message) {
                return res.status(200).json(response2.data.data);
            } else {
                return res.status(400).json(response2.data);
            }
        }
    } catch (e) {
        console.log(e);
    }
    return res.status(200).json("All good");
});

app.post("/api/test/aadhaar/otp/verify", async (req, res) => {
    try {
        const { ref_id, otp } = req.body;
        let accessToken;
        const response = await axios.post(`${process.env.TEST_SANDBOX_URL}/authenticate`, {}, {
            headers: {
                'x-api-key': process.env.TEST_SANDBOX_API_KEY,
                'x-api-secret': process.env.TEST_SANDBOX_API_SECRET,
                'x-api-version': process.env.API_VERSION
            }
        });
        if (response.data.access_token) {
            accessToken = response.data.access_token;
            const verificationResponse = await axios.post(`${process.env.TEST_SANDBOX_URL}/kyc/aadhaar/okyc/otp/verify`, {
                otp,
                ref_id
            }, {
                headers: {
                    "Authorization": `${accessToken}`,
                    'x-api-key': process.env.TEST_SANDBOX_API_KEY,
                    'x-api-version': process.env.API_VERSION
                }
            });
            return res.status(200).json(verificationResponse.data);
        }
        return res.status(400).json("Unable to fetch token");
    } catch (e) {
        console.log(e);
        return res.status(500).json("Failed to verify Aadhaar");
    }
});

app.post("/api/aadhaar/otp/send", async (req, res) => {
    try {
        const {aadhaarNo} = req.body;
        // let accessToken;
        const response = await axios.post(`${process.env.SANDBOX_URL}/authorize?request_token=${ACCESS_TOKEN}`, {}, {
            headers: {
                'x-api-key': process.env.SANDBOX_API_KEY,
                'Authorization': ACCESS_TOKEN,
                'x-api-version': process.env.API_VERSION
            }
        });
        console.log(response.data.access_token);
        if (response.data.access_token) {
            ACCESS_TOKEN = response.data.access_token;
            const response2 = await axios.post(`${process.env.SANDBOX_URL}/kyc/aadhaar/okyc/otp`, {aadhaar_number: aadhaarNo}, {
                headers: {
                    'x-api-key': process.env.SANDBOX_API_KEY,
                    'x-api-version': process.env.API_VERSION,
                    'Authorization': ACCESS_TOKEN
                }
            });
            console.log(response2.data.data);
            if (response2.data.data.ref_id && response2.data.data.message) {
                return res.status(200).json(response2.data.data);
            } else {
                return res.status(400).json(response2.data);
            }
        } else {
            return res.status(400).json("Cannot fetch token");
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
});

app.post("/api/aadhaar/otp/verify", async (req, res) => {
    try {
        const { ref_id, otp } = req.body;
        // const response = await axios.post(`${process.env.SANDBOX_URL}/authorize?request_token=${ACCESS_TOKEN}`, {}, {
        //     headers: {
        //         'x-api-key': process.env.SANDBOX_API_KEY,
        //         'Authorization': ACCESS_TOKEN,
        //         'x-api-version': process.env.API_VERSION
        //     }
        // });
        // if (response.data.access_token) {
        //     ACCESS_TOKEN = response.data.access_token;
            const verificationResponse = await axios.post(`${process.env.SANDBOX_URL}/kyc/aadhaar/okyc/otp/verify`, {
                otp,
                ref_id
            }, {
                headers: {
                    "Authorization": `${ACCESS_TOKEN}`,
                    'x-api-key': process.env.SANDBOX_API_KEY,
                    'x-api-version': process.env.API_VERSION
                }
            });
            return res.status(200).json(verificationResponse.data);
        // }
    } catch (e) {
        console.log(e);
        return res.status(500).json("Failed to verify Aadhaar");
    }
});

app.post("/api/pan", async (req, res) => {
    try {
        const {aadhaar, pan} = req.body;
        let accessToken;
        const response = await axios.post(`${process.env.SANDBOX_URL}/authenticate`, {}, {
            headers: {
                'x-api-key': process.env.SANDBOX_API_KEY,
                'x-api-secret': process.env.SANDBOX_API_SECRET,
                'x-api-version': process.env.API_VERSION
            }
        });
        if (response.data.access_token) {
            accessToken = response.data.access_token;
            const response2 = await axios.get(`${process.env.SANDBOX_URL}it-tools/pans/${pan}/pan-aadhaar-status?aadhaar_number=${aadhaar}`, {
                headers: {
                    'x-api-key': process.env.SANDBOX_API_KEY,
                    'x-api-version': process.env.API_VERSION,
                    'Authorization': accessToken
                }
            });
            console.log(response2.data.data);
            const msg = response2.data.data.message;
            if (msg === `Your PAN ${pan} is linked to Aadhaar number ${aadhaar}`) {
                return res.status(200).json("Aadhaar is linked to pan");
            } else if (msg === "PAN not linked with Aadhaar. Please click on Link Aadhaar link to link your Aadhaar with PAN.") {
                return res.status(400).json("PAN not linked with Aadhaar");
            } else if (msg === "PAN does not exist.") {
                return res.status(400).json("PAN does not exist.");
            } else if (msg === "Please enter a valid 12 digit Aadhaar number.") {
                return res.status(400).json("Please enter a valid 12 digit Aadhaar number.");
            } else {
                return res.status(400).json("PAN is linked to another Aadhaar card")
            }
        } else {
            return res.status(400).json("Cannot fetch token");
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json("Internal server error");
    }
})

app.listen(3000, () => {
    console.log("listening on 3000...");
});