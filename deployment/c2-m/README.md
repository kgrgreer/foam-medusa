# Run 2 Mediator, 2 Node on same machine
# NOTE: need at least 16Gbytes free - 4Gb x 4

/etc/hosts:
127.0.0.1       mediator1
127.0.0.1       mediator2
127.0.0.1       node1
127.0.0.1       node2

# nodes
foam-medusa/deployment/c2-mn/build-1.sh [-j]
foam-medusa/deployment/c2-mn/build-2.sh [-jc]

# mediators
foam-medusa/deployment/c2-mm/build-1.sh
foam-medusa/deployment/c2-mm/build-2.sh [-c]

# 'User' interface at https://mediator1:8100 or https://mediator2:8110
#  or https://nbp:8100, https://nbp:8110
# 'Admin' interface at https://localhost:8100 or https://localhost:8110

# To drop journals - build the node with the -j
