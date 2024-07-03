'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts,deletePost,updatePost, getUserPost } from '@/lib/postSlice';
import { deleteComment } from '@/lib/commentSlice';
import toast from 'react-hot-toast';



interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Home() {
  
  const [expandedPostId, setExpandedPostId] = React.useState<string | null>(null);
  const [postMenuAnchorEl, setPostMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [commentMenuAnchorEl, setCommentMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [createMenuAnchorEl, setCreateMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [postIdToAction, setPostIdToAction] = React.useState<string | null>(null);
  const [commentIdToAction, setCommentIdToAction] = React.useState<string | null>(null);

  const handlePostMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setPostMenuAnchorEl(event.currentTarget);
    // setPostIdToAction(postId);
  };

  const handleCommentMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setCommentMenuAnchorEl(event.currentTarget);
    // setCommentIdToAction(commentId);
  };
  const handleCreateMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setCreateMenuAnchorEl(event.currentTarget);
    // setCommentIdToAction(commentId);
  };

  const handlePostMenuClose = () => {
    setPostMenuAnchorEl(null);
    setPostIdToAction(null);
  };

  const handleCommentMenuClose = () => {
    setCommentMenuAnchorEl(null);
    setCommentIdToAction(null);
  };

  const handleCreateMenuClose = () => {
    setCreateMenuAnchorEl(null);
    // setCommentIdToAction(null);
  };

  const handleExpandClick = (postId: string) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };
  let dispatch = useDispatch<any>();
  let {allPosts,isLoading,isError} = useSelector((state:any)=>state.posts);

  const [isPostsUpdated, setIsPostsUpdated] = React.useState(false);

  React.useEffect(()=>{
    if(!isPostsUpdated) {
      dispatch(getAllPosts());
      dispatch(getUserPost());
      setIsPostsUpdated(true);
    }
  },[isPostsUpdated]);
 
  return (
    <>
    <Grid container sx={{mt:5}} spacing={2}>
      {allPosts?.map((post:any)=> {
        return (
          <Grid key={post._id} item xs={6} lg={3}>
          <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar src={post.user.photo} sx={{ bgcolor: red[500] }} aria-label="recipe">
                
              </Avatar>
            }
            action={
              <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={(e) => {
                  handlePostMenuClick(e)
                  setPostIdToAction(post._id)
                }} sx={{ p: 0 }}>
                <MoreVertIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                
                anchorEl={postMenuAnchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(postMenuAnchorEl)}
                onClose={handlePostMenuClose}
                >
                <MenuItem onClick={handlePostMenuClose}>
                <Link href={`/updatepost/${postIdToAction}`} passHref>
                  <Button variant="text">
                    Update post
                  </Button>
                </Link>
      
                  </MenuItem>
                  
                <MenuItem>
                  <Button onClick={()=> {
                    // console.log({id: postIdToAction})
                    try {
                      dispatch(deletePost(postIdToAction));
                      toast.success('Post deleted successfully');
                    } catch (error) {
                      toast.error('Failed to delete post');
                    }
                    handlePostMenuClose();
                    setIsPostsUpdated(false);
                  }} variant="text">Delete post</Button>
                </MenuItem>
                  
              </Menu>
            </Box>
            }
            title={post.user.name}
            subheader={post.createdAt}
          />
          <CardMedia
            component="img"
            height="194"
            image={post.image}
            alt={post.user.name}
          />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          {post.body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
            <IconButton
            id="basic-button"
            aria-controls={createMenuAnchorEl ? 'basic-button' : undefined}
            aria-haspopup="true"
            aria-expanded={createMenuAnchorEl ? 'true' : undefined}

            onClick={(e) => handleCreateMenuClick(e)}
            
            >
            <ModeCommentIcon/>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={(e) => handleCreateMenuClick(e)} sx={{ p: 0 }}>
              </IconButton>
            </Tooltip>
            <Menu
            id="basic-menu"
            anchorEl={createMenuAnchorEl}
            // open={open}
            open={Boolean(createMenuAnchorEl)}
            onClose={handleCreateMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            >
            <MenuItem onClick={handleCreateMenuClose}><Button href='/createcomment'>Create comment</Button></MenuItem>
          </Menu>
          <ExpandMore
            expand={expandedPostId === post._id}
            onClick={() => handleExpandClick(post._id)}
            aria-expanded={expandedPostId === post._id}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedPostId === post._id} timeout="auto" unmountOnExit>
          <CardContent>
            {post?.comments.map((comment:any)=><Box key={comment._id} className='comment'>
              <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <Box sx={{display:'flex',alignItems:'center'}}>
                <Avatar sx={{width:30,height:30}} src={comment.commentCreator.photo}/>
                <h5 style={{marginLeft:6}}>{comment.commentCreator.name}</h5>
                </Box>
        
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(e) => {
                  handleCommentMenuClick(e)
                  setCommentIdToAction(comment._id)
                }} 
              sx={{ p: 0 }}>
              <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={commentMenuAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(commentMenuAnchorEl)}
              onClose={handleCommentMenuClose}
              >
              <MenuItem onClick={handleCommentMenuClose}>
              <Link href={`/updatecomment/${commentIdToAction}`} passHref>
                  <Button variant="text">
                    Update Comment
                  </Button>
                </Link>
                </MenuItem>
                
                <MenuItem onClick={handleCommentMenuClose}>
                <Button onClick={()=>{
                  console.log(commentIdToAction);
                  try {
                    dispatch(deleteComment(commentIdToAction));
                    toast.success('Comment deleted successfully');
                  } catch (error) {
                    toast.error('Failed to delete comment');
                  }
                  setIsPostsUpdated(false);
                }} variant="text">Delete Comment</Button>
                </MenuItem>
                
            </Menu>
          </Box>
              </Box>
            <Typography paragraph >
            {comment.content}
            </Typography></Box>)}
            
          </CardContent>
        </Collapse>
      </Card>
      </Grid>
      )
      }
      
    )}</Grid>
    </>
   )
}