import {
  Approval,
  ApprovalForAll, Bank, Mint,
  Transfer,
  Upvote
} from "../generated/Bank/Bank"
import { Sticker } from "../generated/schema"

export function handleApproval(event: Approval): void { }

export function handleApprovalForAll(event: ApprovalForAll): void { }

export function handleMint(event: Mint): void {
  const token = event.params.token
  const sticker = new Sticker(token.toHex())
  const contract = Bank.bind(event.address)
  sticker.owner = contract.ownerOf(token)
  sticker.hash = contract.hashOf(token)
  sticker.tags = contract.tagsOf(token)
  sticker.votes = contract.votesOf(token)
  sticker.created_at = event.block.number
  sticker.upvoted_at = event.block.number
  sticker.transfered_at = event.block.number
  sticker.save()
}

export function handleTransfer(event: Transfer): void {
  const token = event.params.tokenId
  const sticker = Sticker.load(token.toHex())!
  sticker.owner = event.params.to
  sticker.transfered_at = event.block.number
  sticker.save()
}

export function handleUpvote(event: Upvote): void {
  const token = event.params.token
  const sticker = Sticker.load(token.toHex())!
  const contract = Bank.bind(event.address)
  sticker.votes = contract.votesOf(token)
  sticker.upvoted_at = event.block.number
  sticker.save()
}
