import { useState, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

interface PersonData {
  displayName: string
  avatar: string
  polyStyle: string
  isCurrentUser: boolean
  depth: number
}

function PersonNode({ data }: NodeProps<Node<PersonData>>) {
  const size = data.isCurrentUser ? 72 : data.depth === 1 ? 60 : 48
  const borderColor = data.isCurrentUser ? '#F5A623' : data.depth === 1 ? '#FB7185' : '#CBD5E1'

  return (
    <>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex flex-col items-center gap-1">
        <div
          className="rounded-full overflow-hidden shadow-card"
          style={{
            width: size,
            height: size,
            border: `3px solid ${borderColor}`,
          }}
        >
          <img src={data.avatar} alt={data.displayName} className="w-full h-full object-cover" />
        </div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: data.isCurrentUser ? '#FFF0C7' : '#F1F5F9',
            color: data.isCurrentUser ? '#8D5408' : '#334155',
          }}
        >
          {data.displayName}
        </span>
        {data.isCurrentUser && (
          <span className="text-[10px] text-honey-600 font-medium">You</span>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </>
  )
}

const nodeTypes = { person: PersonNode }

function avatar(seed: string) {
  return `https://api.dicebear.com/8.x/lorelei/svg?seed=${seed}&backgroundColor=ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`
}

const initialNodes: Node<PersonData>[] = [
  { id: 'me', type: 'person', position: { x: 250, y: 200 }, data: { displayName: 'You', avatar: avatar('me'), polyStyle: 'non_hierarchical', isCurrentUser: true, depth: 0 } },
  // Depth 1 — your partners
  { id: 'alex', type: 'person', position: { x: 80, y: 50 }, data: { displayName: 'Alex', avatar: avatar('alex'), polyStyle: 'non_hierarchical', isCurrentUser: false, depth: 1 } },
  { id: 'morgan', type: 'person', position: { x: 420, y: 50 }, data: { displayName: 'Morgan', avatar: avatar('morgan'), polyStyle: 'solo_poly', isCurrentUser: false, depth: 1 } },
  // Depth 2 — metamours
  { id: 'river', type: 'person', position: { x: 0, y: -120 }, data: { displayName: 'River', avatar: avatar('river'), polyStyle: 'relationship_anarchy', isCurrentUser: false, depth: 2 } },
  { id: 'sage', type: 'person', position: { x: 180, y: -120 }, data: { displayName: 'Sage', avatar: avatar('sage'), polyStyle: 'hierarchical', isCurrentUser: false, depth: 2 } },
  { id: 'luna', type: 'person', position: { x: 500, y: -120 }, data: { displayName: 'Luna', avatar: avatar('luna'), polyStyle: 'hierarchical', isCurrentUser: false, depth: 2 } },
  // Depth 3
  { id: 'kai', type: 'person', position: { x: -50, y: -280 }, data: { displayName: 'Kai', avatar: avatar('kai'), polyStyle: 'relationship_anarchy', isCurrentUser: false, depth: 3 } },
]

const initialEdges: Edge[] = [
  { id: 'me-alex', source: 'me', target: 'alex', label: 'nesting partner', style: { stroke: '#F5A623', strokeWidth: 2 }, labelStyle: { fontSize: 10, fill: '#8D5408' } },
  { id: 'me-morgan', source: 'me', target: 'morgan', label: 'partner', style: { stroke: '#F5A623', strokeWidth: 2 }, labelStyle: { fontSize: 10, fill: '#8D5408' } },
  { id: 'alex-river', source: 'alex', target: 'river', label: 'partner', style: { stroke: '#FB7185', strokeWidth: 1.5 }, labelStyle: { fontSize: 10, fill: '#9F1239' } },
  { id: 'alex-sage', source: 'alex', target: 'sage', label: 'partner', style: { stroke: '#FB7185', strokeWidth: 1.5 }, labelStyle: { fontSize: 10, fill: '#9F1239' } },
  { id: 'morgan-luna', source: 'morgan', target: 'luna', label: 'partner', style: { stroke: '#FB7185', strokeWidth: 1.5 }, labelStyle: { fontSize: 10, fill: '#9F1239' } },
  { id: 'river-kai', source: 'river', target: 'kai', label: 'comet', style: { stroke: '#CBD5E1', strokeWidth: 1 }, labelStyle: { fontSize: 10, fill: '#64748B' } },
]

export default function ConstellationPage() {
  const [nodes] = useState(initialNodes)
  const [edges] = useState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id === selectedNode ? null : node.id)
  }, [selectedNode])

  const selected = nodes.find((n) => n.id === selectedNode)

  return (
    <div className="h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={2}
      >
        <Background color="#E2E8F0" gap={20} />
        <Controls showInteractive={false} />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-card text-xs space-y-1">
        <p className="font-semibold text-hive-700">Your Constellation</p>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-honey-500 rounded" />
          <span className="text-hive-500">Your partners</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-nectar-400 rounded" />
          <span className="text-hive-500">Metamours</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-hive-300 rounded" />
          <span className="text-hive-500">Extended</span>
        </div>
      </div>

      {/* Selected node detail */}
      {selected && !selected.data.isCurrentUser && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-card-hover p-4">
          <div className="flex items-center gap-3">
            <img
              src={selected.data.avatar}
              alt={selected.data.displayName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-display font-bold text-hive-800">{selected.data.displayName}</p>
              <p className="text-xs text-hive-500 capitalize">{selected.data.polyStyle.replace(/_/g, ' ')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
