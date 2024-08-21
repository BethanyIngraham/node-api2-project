// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const posts = await Posts.find()
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json({
            message: 'The posts information could not be retrieved'
        })
    }
})

router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params
        const post = await Posts.findById(id)
        if(!post){
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        }else{
            res.status(200).json(post)
        }
    }catch(err){
        res.status(500).json({
            message: 'The post information could not be retrieved'
        })
    }
})

router.post('/', async (req, res) => {
    try{
        const {title, contents} = req.body
        if(!title || !contents){
            res.status(400).json({
                message: 'Please provide title and contents for the post'
            })
        }else{
            const createdPostId = await Posts.insert({title, contents})
            const {id} = createdPostId 
            const createdPost = await Posts.findById(id)
            res.status(201).json(createdPost)
        }
    }catch(err){
        res.status(500).json({
            message: 'The post information could not be retrieved'
        })
    }
})

router.put('/:id', async (req, res) => {
    try{
        const {title, contents} = req.body
        if(!title || !contents){
            res.status(400).json({
                message: 'Please provide title and contents for the post'
            })
        }else{
            const {id} = req.params
            const post = await Posts.findById(id)
            if(!post){
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            }else{
                const numberOfUpdatedPosts = await Posts.update(id, {title, contents})
                if(numberOfUpdatedPosts){
                    const {id} = req.params
                    const updatedPost = await Posts.findById(id)
                    res.status(200).json(updatedPost)
                }
            }
            }
    }catch(err){
        res.status(500).json({
            message: 'the post information could not be modified'
        })
    }
})

module.exports = router