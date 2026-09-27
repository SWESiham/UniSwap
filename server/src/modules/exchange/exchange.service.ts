import ExchangeProposal from "../../models/ExchangeProposal.model";

export const createProposal = (proposerId: string, listingId: string, offeredItem: string) =>
  ExchangeProposal.create({ proposer: proposerId, listing: listingId, offeredItem });

export const getProposalsForListing = (listingId: string) =>
  ExchangeProposal.find({ listing: listingId }).populate("proposer", "name faculty");

export const respondToProposal = (id: string, status: "accepted" | "declined") =>
  ExchangeProposal.findByIdAndUpdate(id, { status }, { new: true });
