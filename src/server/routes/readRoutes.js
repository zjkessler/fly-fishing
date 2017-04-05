var express = require( "express" );
var request = require( "request" );
var readRouter = express.Router();
var Blog = require( "../models/blogModel" );
var User = require( "../models/userModel" );

readRouter.route( '/' )
    .get( function ( req, res ) {
        Blog.find( {
            reader: req.user._id
        }, function ( err, bloglist ) {
            console.log( bloglist );
            if ( err ) res, status( 500 ).send( err );
            res.send( bloglist );
        } )
    } )

readRouter.route( '/:blogId' )
    .delete( function ( req, res ) {
        Blog.findOneAndRemove( {
            _id: req.params.blogId
        }, function ( err, deleteBlog ) {
            if ( err ) {
                res.status( 500 ).send( err );
            } else {
                res.send( deleteBlog );
            }
        } )
    } )

module.exports = readRouter;
