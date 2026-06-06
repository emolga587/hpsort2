import React from "react";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import hpDB from "../modules/HPDatabase.ts";

interface Props {
    name: string;
    rank: number;
}

interface State { }

export default class ResultPicture extends React.Component<Props, State> {
    override render() {
        let img_dir: string;
        if (Number(hpDB.memberName2ID(this.props.name)) < 9000) {
            img_dir = "member_pics/";
        } else {
            img_dir = "extra_pics/";
        }

        const styles =
        {
            media: {
                width: 96,
                height: 80,
                zoom: 1
            }
        };

        let name_font_size = 14;
        let card_width: 3 | 4 | 6 | 12 = 4;

        if (this.props.rank === 1) {
            styles.media.width *= 3;
            styles.media.height *= 3;
            name_font_size += 2;
            card_width = 12;
        } else if (this.props.rank <= 3) {

            styles.media.width *= 3 / 2;
            styles.media.height *= 3 / 2;
            name_font_size += 1;
            card_width = 6;
        } else if (this.props.rank >= 7) {
            styles.media.width *= 8 / 9;
            name_font_size -= 2;
            card_width = 3;
        }

        return (
            <Grid container size={card_width} sx={{ justifyContent: "center" }}>
                <Box sx={{ m: 0.5 }}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt={this.props.name}
                            image={`${img_dir}${this.props.name}.webp`}
                            title="Contemplative Reptile"
                            style={styles.media}
                        />
                        <CardContent style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 5, paddingRight: 5, textAlign: "center" }}>
                            <Typography component="p" style={{ fontSize: name_font_size }}>
                                {this.props.rank}位
                            </Typography>
                            <Typography component="p" style={{ fontSize: name_font_size }}>
                                {this.props.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        );
    }
}
