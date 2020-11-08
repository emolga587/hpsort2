import React from "react";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import hpDB from "../modules/HPDatabase";

interface Props {
    name: string;
    onClick?: any;
}

interface State { }

export default class MemberPicture extends React.Component<Props, State> {
    render() {
        const styles =
        {
            card: {
                maxWidth: 345,
            },
            media: {
                height: "300px"
            }
        };
        return (
            <Card onClick={this.props.onClick} style={styles.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={this.props.name}
                        image={`/member_pics/${this.props.name}.jpg`}
                        title="Contemplative Reptile"
                        style={styles.media}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {this.props.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {hpDB.groupNameByMemberName(this.props.name)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}